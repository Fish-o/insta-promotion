#!/usr/bin/env node

import moment from "moment";
import request, { gql } from "graphql-request";
import fs from "fs/promises";

async function fetchActivities(weekNumber) {
  const week = moment("2026W" + weekNumber);

  const start = week.startOf("week").toISOString();
  const end = week.endOf("week").toISOString();

  const res = await request(
    "https://www.inter-actief.utwente.nl/graphql/",
    gql`
      query UpcomingActivities($start: DateTime, $end: DateTime) {
        activities(begin_Gt: $start, begin_Lt: $end) {
          results {
            summary
            location
            begin
            end
            imageIcon
            enrollment
            absoluteUrl
            activityLabel {
              name
              color
            }
            price
          }
        }
      }
    `,
    {
      end: end,
      start: start,
    },
    {
      "Cookie": "amelie_django_language=en"
    }
  ).catch((error) => {
    console.error("Error fetching data for upcoming activities:", error);
    return {
      activities: {
        results: [],
      },
    };
  });

  console.log("Fetched data for upcoming activities:", res);
  return res.activities.results;
}

async function main() {
  const args = process.argv.slice(2);
  const weekNumber = args[0] ? parseInt(args[0], 10) : moment().isoWeek();
  const outputFile = args[1] || `src/activities.json`;

  console.log(`Fetching activities for week ${weekNumber}...`);

  try {
    const activities = await fetchActivities(weekNumber);

    await fs.writeFile(
      outputFile,
      JSON.stringify(activities, null, 2),
      "utf-8"
    );

    console.log(
      `Successfully wrote ${activities.length} activities to ${outputFile}`
    );
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();