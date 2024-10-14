import csv

data = [
    ["Name", "Age", "City"],
    ["Alice", 30, "New York"],
    ["Bob", 25, "Los Angeles"],
]

with open("output.csv", mode="w", newline="") as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(data)  # Writes multiple rows at once
