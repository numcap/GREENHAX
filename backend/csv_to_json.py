import pandas as pd

# Read the CSV file
csv_path = "./environmental_dataset_expanded.csv"
df = pd.read_csv(csv_path)

# Convert DataFrame to JSON (array of objects)
json_path = "./environmental_dataset_expanded.json"
df.to_json(json_path, orient="records", indent=2)

print(f"JSON file created: {json_path}")
