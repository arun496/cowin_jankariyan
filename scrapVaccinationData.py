# webdriver for browser instance; keys for keyboard strokes;

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import sys

def scrapVaccinationData(pincode):
    try:
        # For headless
        # Initialize chrome instance
        options = Options()
        options.headless = True
        driver = webdriver.Chrome(options=options)
        targetURL = "https://www.cowin.gov.in/#Search-Vaccination-Center"
        driver.maximize_window()
        driver.get(targetURL)

        # Create actions instance to perform operations
        action = ActionChains(driver)

        # Locality based tab headers
        pinTabSelWait = WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="mat-tab-label-0-0"]/div')))
        pinInputBoxSel = WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="mat-input-0"]')))
        pinSearchBtnSel = WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="mat-tab-content-0-0"]/div/div[1]/div/div/button')))

        # Search by PINCODE
        pinTabSelWait.click()
        pinInputBoxSel.click()
        action.send_keys(pincode).perform()
        pinSearchBtnSel.click()

        # Get present week Dates
        availableDatesData = []
        availableDatesSel = WebDriverWait(driver, 20).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.item.carousel-item.active.ng-star-inserted .availability-date')))

        for date in availableDatesSel:
            availableDatesData.append(date.text)

        vaccinationsRowsData = [] # Stores all vaccination centres details for the week
        vaccinationsDataAllRowsWait = driver.find_elements_by_css_selector(".row.ng-star-inserted")

        # If vaccinations table scheduled for whole week
        if vaccinationsDataAllRowsWait: 
            for rowsWithVAccinationsData in vaccinationsDataAllRowsWait:
                vaccineRowDetails = {}
                nameHeader = rowsWithVAccinationsData.find_element_by_css_selector(".center-name-title").text
                localityAddress = rowsWithVAccinationsData.find_element_by_css_selector(".center-name-text").text
                # Dosage slots for each vaccination centre (i.e. each row)
                dosageSlotBoxAvailableSel = rowsWithVAccinationsData.find_elements_by_css_selector(".slots-box.ng-star-inserted")

                dosageSlotsData = [] # Data of dosage slots from each row stored
                for dosageSlot in dosageSlotBoxAvailableSel:
                    dosageObject = {}   # To store dosage details
                    dosageExistsSel = dosageSlot.find_elements_by_css_selector(".slots-box.ng-star-inserted .dosetotal")
                    if dosageExistsSel:
                        dosageContentSel = dosageSlot.find_elements_by_css_selector(".slots-box.ng-star-inserted .dosetotal > span")
                        dosage1 = dosageContentSel[0].text.split("\n")
                        dosage2 = dosageContentSel[1].text.split("\n")
                        # Check dosage existence
                        dosageObject["d1"] = not dosage1[1] == "0"
                        dosageObject["d2"] = not dosage2[1] == "0"
                    else: dosageObject = None
                    dosageSlotsData.append(dosageObject)


                vaccineRowDetails["nameHeader"] = nameHeader
                vaccineRowDetails["localityAddress"] = localityAddress
                vaccineRowDetails["dosage"] = dosageSlotsData
                # Add all details of vaccination centre
                vaccinationsRowsData.append(vaccineRowDetails)
        else:
            vaccinationsRowsData = None

        vaccinationDataStorage = {}
        vaccinationDataStorage["dates"] = availableDatesData
        vaccinationDataStorage["scrapedData"] = vaccinationsRowsData
        return json.dumps(vaccinationDataStorage)

    except:
        raise Exception("Something went wrong in data scraping..")

if __name__ == "__main__":
    vaccinationData = scrapVaccinationData(sys.argv[1])
    print(vaccinationData)