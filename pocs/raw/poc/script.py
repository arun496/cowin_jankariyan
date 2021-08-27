# Selenium starter==========

# webdriver for browser instance; keys for keyboard strokes;
# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys

# driver = webdriver.Chrome()
# targetURL = "https://www.cowin.gov.in/#Search-Vaccination-Center"
# driver.get(targetURL)
# print(driver.title)


# Input test============

import sys
def callMe():
    return "From func data"

if __name__ == "__main__":
    data = callMe()
    # print(data)
    # For command line input
    print(sys.argv)


# JSON test==============

# import json
# def fetchJSONData():
#     dict = {
#         "name": "arun",
#         "dept": "Mech",
#         "age": 21
#     }
#     return json.dumps(dict)

# if __name__ == "__main__":
#     data = fetchJSONData()
#     print(data)