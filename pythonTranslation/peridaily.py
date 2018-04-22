#! /usr/bin/env python3

import requests
from bs4 import BeautifulSoup

page = requests.get('http://www.peridance.com/openclasses.cfm')
soup = BeautifulSoup(page.text, 'html.parser')

date = soup.table.tr.span.text.split('for: ')[1]
genreList = soup.find_all('tr')


#print(date) #prints date of class
for x in genreList:
    #print(x)
    if x.td.center:
        print("genre: " + x.td.center.text) #prints genre of class 
    elif x.td.text:
        infoList = x.find_all('td') #finds all td in current tr (3 total)
        for cell in infoList:
            if cell.attrs: #skips printing for time/level/teacher rows
                if cell.string: #if cell has only child and child is a navigable string, returns as string
                    print("time: " + str(cell.string))
                elif cell.div and cell.div.text:
                    print("level: " + str(cell.div.text).strip())
                elif cell.a:
                    print("link: " + "http://www.peridance.com/" + str(cell.a['href']) + "\n" + "teacher: " + str(cell.font.text))
                elif cell.font and cell.font.text:
                     print("teacher: " + str(cell.text).strip())
 #                   print("OUTLIER: " + str(cell))
    print("\n-------")



#NEXT STEPS
#replace list with dictionary/object-like structure
#translate these objects into records for Database
