import { datoToken } from "$env/static/private";

export async function load({ params }) {
    const query = `
        query {
            allCompliments(first: "100") {
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
    console.log(returnable.allCompliments.length)
    return {
        data: returnable,
    };
}
