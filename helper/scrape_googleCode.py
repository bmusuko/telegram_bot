import requests
import json
from bs4 import BeautifulSoup


data = requests.get('https://www.labnol.org/code/19899-google-translate-languages')

soup = BeautifulSoup(data.text,'html.parser')

table = soup.find('table')
dictionary = {}

for tr in table.find_all('tr'):
    values = [td.text for td in tr.find_all('td')]
    if values:
        dictionary[values[1]] = values[0]

r = json.dumps(dictionary)
f = open("googleKey.json", "w")
f.write(r)
f.close()