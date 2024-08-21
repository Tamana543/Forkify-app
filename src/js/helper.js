import { TIME_OUT } from './config';
function timeout(sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
}
export async function AJAX(url, uploadData = undefined) {
  try {
    const main = uploadData
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : await fetch(url);

    const race = await Promise.race([main, timeout(TIME_OUT)]);
    const data = await race.json();
    if (!main.ok) throw new Error(`${data.message} (${main.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}
// export async function JSON_HUND(url) {
//   try {
//     const main = await fetch(url);
//     const race = await Promise.race([main, timeout(TIME_OUT)]);
//     const data = await race.json();
//     if (!main.ok) throw new Error(`${data.message} (${main.status})`);
//     return data;
//   } catch (err) {
//     throw err; // do this to get error completly from main moduls
//   }
// }

// export async function Send_JSON(url, uploadData) {
//   try {
//     const main = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const race = await Promise.race([main, timeout(TIME_OUT)]);
//     const data = await race.json();
//     if (!main.ok) throw new Error(`${data.message} (${main.status})`);
//     console.log(data);
//     return data;
//   } catch (err) {
//     throw err; // do this to get error completly from main moduls
//   }
// }
