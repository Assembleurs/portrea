# Download this file :

"https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-data-inclusion-1/"

# Import necessary libraries
import json

# Define the file path (change the file name)
file_path = "/mnt/data/structures-inclusion-20231010-data-inclusion-sans-doublons.json"

# Read the JSON file to check its structure
with open(file_path, "r") as f:
    data = json.load(f)

# Show a sample of the data for inspection
sample_data = data[:5]  # Show only the first 5 entries
sample_data

from collections import defaultdict

# Initialize a defaultdict to store the associations
code_insee_to_courriel = defaultdict(list)

# Loop through each entry in the data to populate the defaultdict
for entry in data:
    code_insee = entry.get("code_insee", None)
    courriel = entry.get("courriel", None)

    if code_insee and courriel:
        code_insee_to_courriel[code_insee].append(courriel)

# Convert the lists to comma-separated strings
for code_insee, courriels in code_insee_to_courriel.items():
    code_insee_to_courriel[code_insee] = ",".join(
        set(courriels)
    )  # Removing duplicates using set()

# Show a sample of the resulting dictionary
dict(list(code_insee_to_courriel.items())[:5])

# Define the output file path
output_file_path = "/mnt/data/code_insee_to_courriel.json"

# Save the dictionary to a JSON file
with open(output_file_path, "w") as f:
    json.dump(code_insee_to_courriel, f)

output_file_path
