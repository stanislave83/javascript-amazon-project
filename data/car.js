class Car {
  #brand;
  #model;
  speed;
  trunk;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = carDetails.speed;
  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`);
  }
  
  go(){
    if(this.trunk){
      return;
    }else{
      const newSpeed = this.speed+=5;
      if(newSpeed>0&&newSpeed<200){
        this.speed = newSpeed;
      }
    }
  }

  break(){
    const newSpeed = this.speed-=5;
    if(newSpeed>0&&newSpeed<200){
      this.speed = newSpeed;
    }
  }

  openTrunk(){
    if(this.speed){
      return;
    }else{
      this.trunk = true;
    }
  }

  closeTrunk(){
    this.trunk = false;
  }

  isTrunkOpen(){
    if(this.trunk){
      return true;
    }else{
      return false;
    }
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go(){
    const newSpeed = this.speed+=this.acceleration;
    if(newSpeed>0&&newSpeed<300){
      this.speed = newSpeed;
    }
  }

  openTrunk(){}
  closeTrunk(){}
}





const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla',
  speed: 0
})

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3',
  speed: 0
})

const car3 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  speed: 0,
  acceleration: 20
})

// .map((carItems)=>{
//   return new Car(carItems);
// })

car1.go();
car1.break();

car2.go();
car2.go();
car2.go();
car2.break();


console.log(car1.isTrunkOpen());

car1.openTrunk();
console.log(car1.isTrunkOpen());

car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.displayInfo(); // doesn't work as the car cannot go when isTruckOpen

car1.closeTrunk();
console.log(car1.isTrunkOpen());

car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go(); //works after isTruckOpen = false


car1.displayInfo();
car2.displayInfo();

car3.go();
car3.go();
car3.go();
car3.go();
car3.go();

car3.break();
car3.break();
car3.break();

car3.displayInfo();