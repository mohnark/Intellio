import pandas as pd
import os

# Load the CSV file
input_file = '201709301651_masters_portal.csv'
df = pd.read_csv(input_file)

# Calculate the number of rows per chunk
num_chunks = 5
rows_per_chunk = len(df) // num_chunks

# Split the DataFrame into 10 parts
output_dir = 'split_files'
os.makedirs(output_dir, exist_ok=True)

for i in range(num_chunks):
    start_row = i * rows_per_chunk
    end_row = (i + 1) * rows_per_chunk if i != num_chunks - 1 else len(df)
    chunk = df.iloc[start_row:end_row]
    chunk.to_csv(f'{output_dir}/chunk_{i + 1}.csv', index=False)

print(f"CSV split into {num_chunks} parts.")
