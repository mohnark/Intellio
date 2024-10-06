import re
from flask import Flask, request, jsonify
from ibm_watson import DiscoveryV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from ibm_watsonx_ai.foundation_models import Model
from dotenv import load_dotenv
from flask_cors import CORS
from prompt import PROMPT
import os
import json

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

WATSONX_API_KEY = os.getenv("WATSONX_API_KEY")
WATSONX_PROJECT_ID = os.getenv("WATSONX_PROJECT_ID")
WATSONX_ENDPOINT = os.getenv("WATSONX_ENDPOINT")
WD_API_KEY = os.getenv("WD_API_KEY")
WD_URL = os.getenv("WD_URL")
WD_PROJECT_ID = os.getenv("WD_PROJECT_ID")

wd_authenticator = IAMAuthenticator(WD_API_KEY)
discovery = DiscoveryV2(
    version='2020-08-30',
    authenticator=wd_authenticator
)
discovery.set_service_url(WD_URL)
def load_llm(api_key, project_id, endpoint):

    generate_params = {
        GenParams.MAX_NEW_TOKENS: 200
    }

    return Model(
                model_id='meta-llama/llama-3-1-70b-instruct',
                params=generate_params,
                credentials={"apikey": api_key, "url": endpoint},
                project_id=project_id
                )

llm_model = load_llm(WATSONX_API_KEY, WATSONX_PROJECT_ID, WATSONX_ENDPOINT)


@app.route('/')
def index():
    return 'REST API server running'

@app.route('/query-discovery', methods=['POST'])
def query_discovery():
    # try:
        user_query = request.json.get('query')
        if not user_query:
            return jsonify({'error': 'No query provided'}), 400

        llama_prompt = PROMPT.replace("{{question}}", user_query)
        
        llama_response = llm_model.generate(prompt=llama_prompt)
        generated_text = llama_response['results'][0]['generated_text']
        if generated_text and 'enriched_Required_Skills' in llama_response['results'][0]['generated_text']:
            query = extract_query(generated_text)
            discovery_response = discovery.query(
                project_id=WD_PROJECT_ID,
                natural_language_query=query,
                count=2
            ).get_result()
            if discovery_response['results'][0]:
                response_text = f"You should try applying for a master's at {discovery_response['results'][0]['University_Name']} for the {discovery_response['results'][0]['Program_Name']} program."
                return jsonify(response_text), 200
            return jsonify({'response': 'Could Not Find any matching results. Maybe you could modify your query'}), 500
        else:
            return jsonify({'response': generated_text}), 200

    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500

def extract_query(text):
    query_match = re.search(r'\"enriched_Required_Skills\":\s*\[([^\]]+)\]', text, re.DOTALL)

    if query_match:
        skills_list = query_match.group(1).replace("'", "").strip()
        skills = ', '.join([skill.strip() for skill in skills_list.split(',')])
        return skills
        # formatted_query = f"enriched_Required_Skills:{skills}"
        # return formatted_query
    else:
        return "Error: Query not found"
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
