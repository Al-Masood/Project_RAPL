import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

webdriver_path = '/opt/homebrew/bin/chromedriver'

chrome_options = Options()
chrome_options.add_extension('./Carrot 0.6.6.0.crx')
service = Service(webdriver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

first_user_handle = None

json_data = {
    "number": None,
    "name": None,
    "date": time.strftime("%Y-%m-%d %H:%M:%S"),
    "data": []
}

# Function to scrape standings for a given contest and page number
def scrape_standings(contest_number, page_number):
    global first_user_handle
    
    # URL of the webpage you want to scrape
    url = f'https://codeforces.com/contest/{contest_number}/standings/page/{page_number}'
    
    # Open the webpage in Chrome
    driver.get(url)
    if page_number == 1:
        time.sleep(15)
    else: 
        time.sleep(3)
    
    # Get the page source
    html_data = driver.page_source
    
    # Parse the HTML data using BeautifulSoup
    soup = BeautifulSoup(html_data, 'html.parser')
    
    contest_name_element = soup.find('div', class_='contest-name title')
    contest_name = contest_name_element.text.strip()
    
    json_data['name'] = contest_name
    
    # Find all participant rows
    participant_rows = soup.find_all('tr', {'participantid': True})
    
    # Extract the first user handle of the page
    if participant_rows:
        first_user_handle = participant_rows[0].find('a', {'class': 'rated-user'}).text.strip()
    
    # Check if the first user handle of the current page is the same as the last user handle of the previous page
    if first_user_handle == last_user_handle:
        return True  # Stop scraping, we've reached the end
    
    # Iterate over participant rows and extract user handle and performance rating
    for row in participant_rows:    
        user_handle_tag = row.find('a', {'class': 'rated-user'})
        performance_rating_tag = row.find('td', {'class': 'carrot-final-performance'})
        
        if user_handle_tag and performance_rating_tag:
            user_handle = user_handle_tag.text.strip()
            performance_rating = performance_rating_tag.text.strip()
            
            json_data["data"].append({"handle": user_handle, "performanceRating": performance_rating})
    
    return False  # Continue scraping

# Ask the user for contest number
contest_number = input("Enter the contest number: ")

# Initialize last_user_handle
last_user_handle = None

for page_number in range(1, 200):
    should_stop = scrape_standings(contest_number, page_number)
    if should_stop:
        break
    last_user_handle = first_user_handle  # Update last_user_handle for the next iteration

# Set contest number in JSON data
json_data["number"] = int(contest_number)

# Write JSON data to file
json_file_name = f"contest_{contest_number}_standings.json"
with open(json_file_name, 'w') as json_file:
    json.dump(json_data, json_file)

# Close the browser
driver.quit()
