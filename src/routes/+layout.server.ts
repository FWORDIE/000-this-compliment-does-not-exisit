import { datoToken } from "$env/static/private";

export async function load({ params }) {
    let responseArray = [];
    let query = `
        query {
            _allComplimentsMeta {
                count
              }
          }
    `;

    const response1 = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${datoToken}`,
        },
        body: JSON.stringify({ query }),
    });

    const jsontotal = await response1.json();
    while (responseArray.length < jsontotal.data._allComplimentsMeta.count) {

        query = `
        query {
            allCompliments(skip: "${responseArray.length}", first: "100") {
              text
              audio {
                url
              }
            }
          }
    `;
        const response = await fetch("https://graphql.datocms.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${datoToken}`,
            },
            body: JSON.stringify({ query }),
        });
        const json = await response.json();

        const returnable = json.data;
        // console.log(returnable.allCompliments.length);
        responseArray = [...responseArray, ...returnable.allCompliments]
    }

    return {
        data: responseArray,
    };
}
