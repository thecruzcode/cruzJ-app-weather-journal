(function() {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const apiKey = '74700f57e101d78648e889f975426f0a';

  const date = new Date().toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const zipElem = document.getElementById('zip_area');
  const feelingsElem = document.getElementById('enter_feelings');
  const generateButton = document.getElementById('generate_entry');

  const dateElem = document.getElementById('date');
  const tempElem = document.getElementById('temp');
  const contentElem = document.getElementById('entryContent');

  const getWeatherInfo = async zip =>
    await fetch(`${baseUrl}?zip=${zip}&units=metric&APPID=${apiKey}`);

  const saveEntry = async ({ temperature, data, feeling }) =>
    await fetch('/api/v1/entry', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ temperature, date, feeling })
    });

  const updateUI = async () => {
    try {
      const { temperature, date, feeling } = await (
        await fetch('/api/v1/entry')
      ).json();

      dateElem.textContent = date;
      tempElem.textContent = temperature;
      contentElem.textContent = feeling;
    } catch (err) {
      console.log(err);
    }
  };

  generateButton.addEventListener('click', async () => {
    generateButton.textContent = 'Loading......';
    const zip = zipElem.value;
    const feeling = feelingsElem.value;
    const res = await getWeatherInfo(zip);
    generateButton.textContent = 'Generate';

    try {
      const {
        main: { temp: temperature }
      } = await res.json();
      await saveEntry({ temperature, date, feeling });
      await updateUI();
    } catch (err) {
      console.error(err);
    }
  });
})();
