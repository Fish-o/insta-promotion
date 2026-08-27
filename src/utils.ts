import { gql, request } from "graphql-request";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchActivities(): Promise<any> {
  "use server";
  const res = await request({
    url: "https://www.inter-actief.utwente.nl/graphql",
    document: gql`
      query UpcommingActivities($start: DateTime, $end: DateTime) {
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
            }
            price
          }
        }
      }
    `,

    variables: {
      end: "2026-09-30T15:08:19Z",
      start: "2026-08-27T15:08:19Z",
    },
  }).catch((error) => {
    console.error("Error fetching data for upcoming activities:", error);
    return {
      activities: {
        results: [],
      },
    };
  });
  console.log("Fetched data for upcoming activities:", res);
  return res;
  // ...
}
