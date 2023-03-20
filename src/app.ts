interface Bird {
  type: 'bird'; // as literal type
  flyingSpeed: number;
}

interface Horse {
  type: 'horse'; // as literal type
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
      case 'bird':
          speed = animal.flyingSpeed;
          break;
      case 'horse':
          speed = animal.runningSpeed;
          break;
  }
  console.log('Moving with speed: ' + speed);
}

moveAnimal({type: 'horse', runningSpeed: 100});