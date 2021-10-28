function task1() {
  return new Promise((resolve, reject) => {
    const count = 100000000;
    let i = 0;
    while ( i < count ) {
      i++;
    }
    resolve("task1 is done");
  });
}

function task2() {
  return new Promise((resolve, reject) => {
    resolve("task2 is done");
  });
}

const tasks = [task1(), task2()];
Promise.all(tasks)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
});



