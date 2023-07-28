import json
import pandas as pd

# Load the JSON file into a pandas dataframe
with open("/mnt/data/inseediplome.json") as f:
    data = json.load(f)

df = pd.json_normalize(data)

# Calculate the sums
sum_p19_nscol15p_diplmin = df["p19_nscol15p_diplmin"].sum()
sum_p19_nscol15p = df["p19_nscol15p"].sum()

# Calculate the percentage
percentage = (sum_p19_nscol15p_diplmin / sum_p19_nscol15p) * 100

percentage

21.859586052335626
