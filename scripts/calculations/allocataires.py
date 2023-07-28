# Allocataires

import json

# Load the JSON file
with open("/mnt/data/inseecaf.json") as f:
    data = json.load(f)

# Get the sum of 'a'
sum_a = sum(int(item["a"]) for item in data if isinstance(item["a"], int))
sum_a

9143032

# Chiffre national officiel : 13 783 700	"https://www.insee.fr/fr/statistiques/6691948#:~:text=En%20France%20(hors%20Mayotte)%2C,6%20millions%20ou%20d'aides"

# Population de 15 ans ou plus

import json

# Load the JSON file
with open("/mnt/data/inseepop.json") as file:
    data = json.load(file)

# Calculate the sum of the values of c19_pop15p
sum_value = sum(item["c19_pop15p"] for item in data)

sum_value

54991763

# Calcul pris en compte
# (13783700/54991763)*100
# = 25.07


# Percou

# Load the new JSON data
with open("/mnt/data/inseecaf.json") as f:
    data_caf = json.load(f)

# Convert numeric strings to integers, and treat empty strings as zeros
sum_percou_corrected = sum(
    int(item["percou"]) if item["percou"] != "" else 0 for item in data_caf
)
sum_percou_corrected

20411844

# 2e méthode :
# APPA + ARSAS + AAH

import json

# Reload the JSON data after the new upload
with open("/mnt/data/inseecaf.json") as f:
    data_caf = json.load(f)

# Convert numeric strings to integers, and treat empty strings as zeros
sum_aaah_appa_arsas_corrected = sum(
    (int(item["aaah"]) if item["aaah"] != "" else 0)
    + (int(item["appa"]) if item["appa"] != "" else 0)
    + (int(item["arsas"]) if item["arsas"] != "" else 0)
    for item in data_caf
)
sum_aaah_appa_arsas_corrected

5068123

## Calculate the sum of the values of c19_pop15p
sum_value = sum(item["c19_pop15p"] for item in data)

sum_value

54991763

# Soit 9,22 % de la popuation de plus de 15 ans
