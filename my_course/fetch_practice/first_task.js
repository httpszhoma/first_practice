const url = "https://randomuser.me/api/?results=2";

async function getWeather() {
    const response = await fetch(url);
    const data = await response.json();
    
    let count = 0;
    data.results.forEach(element => {
        const firstName = element.name.first;
        const lastName = element.name.last;
        const email = element.email;
        const pictureUrl = element.picture.large;
        count++;

        console.log(`${count}) Name: ${firstName} ${lastName}`);
        console.log(`   Email: ${email}`);
        console.log(`   Picture URL: ${pictureUrl}`);
    });
}

getWeather();
