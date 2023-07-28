# Demandeurs d'emploi

6430000 https://www.insee.fr/fr/statistiques/6453706?sommaire=6453776

# Population de plus de 15 ans

with open("/mnt/data/inseepop.json") as file:
    data = json.load(file)

## Calculate the sum of the values of c19_pop15p
sum_value = sum(item["c19_pop15p"] for item in data)

sum_value

54991763

# Calcul

(54991763/6430000)*100

= 11.69%