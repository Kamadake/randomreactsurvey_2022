# React Survey Demo
Survey tool project to learn React

## Running in Dev mode for Development Purposes
You can run the project in 'dev' mode using `npm run dev`.
You also have `npm run devhost` in case you want to expose the network and view the website via another device/computer.

## Running a Production variant
This is a two step process:
- `npm run build` to tell Vite to build the project for us
- `npm run preview` to be able to view the results of the completed build

## Survey module uses cookies!
The survey module uses two cookies:
- `surveyresults_${surveyid}` is used to maintain the page and current values of the fields
- `surveydone_${surveyid}` is used to mark completion of the survey

If you want to retest the survey, you will have to manually kill these cookies.

## Other nice to haves for this demo
- Proper fade out of the Modal popup. Still not sure of the clean "React" way to make my Modal fade out. Probably there's some animation plugin out there that can handle hiding a component with animation.
- Error handling on input fields with regex patterns. JSON would state what regex pattern id to use and the frontend client would have a list of these regex patterns. Server could give a regex pattern too perhaps.
- Practice some sort of unit testing with the combination of Jest + React
