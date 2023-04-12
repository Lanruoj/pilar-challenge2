# **Cypress challenge #3**

### **To run test & generate report**

```node
npm run report
```

## **Instructions**

The below test has several errors. Fix it, but do not use a `while` or `for` loop.

## **Preconditions**

- The website with the date picker is accessible
- The date picker is visible on the page
- Desired year: 2024

## **Test steps**

- Open the website with the date picker
- Click on the date picker
- Verify that the current year is displayed in the date picker
- If the current year is not the desired year, navigate to the desired year by _only_ clicking on the "next" button
  until the desired year is displayed in the date picker
- Click on a date in the desired year
- Verify that the date input field displays the selected date in the expected format `mm-dd-yyyy`

## **Expected Results**

- The date picker should allow the user to select a specific date in a specific year
- The selected date should be displayed in the date input field in the expected format

_Created by Pilar Gonzalez from Winning Group_
