#! /usr/bin/env python3

import urllib.request as urllib2
from bs4 import BeautifulSoup

class_page = 'http://www.peridance.com/openclasses.cfm'
page = urllib2.urlopen(class_page)
soup = BeautifulSoup(page, 'html.parser')

date = soup.table.tr.span.text.split('for: ')[1]
genreList = soup.find_all('tr')


#print(date) #prints date of class
for x in genreList:
    print(x)
    if x.td.center:
        print(x.td.center.text) #prints genre of class 
    elif x.td.text:
        infoList = x.find_all('td')
        for y in infoList:
            if y.text:
                print(y.text) #prints time of class
            elif y.div.text:
                print(y.div.text.strip()) #prints level of class
            elif y.a.font.text:
                print(y.a.font.text) #prints teacher of class
    #if x.td.next_sibling: #will never work bc using a tag name as an attr
        #only gets u the first tag by that name
    print("\n-------")



#NEXT STEPS
#strip time/level/teacher td
#strip whitespace
#replace list with dictionary/object-like structure
#translate these objects into records for Database
