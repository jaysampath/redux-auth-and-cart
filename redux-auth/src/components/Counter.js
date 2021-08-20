import classes from './Counter.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { counterActions } from '../store/counter-slice';
const Counter = () => {
  
  const dispath = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  const show = useSelector(state=>state.counter.showCounter)
  const toggleCounterHandler = () => {
    dispath(counterActions.toggleCounter())
  };
  
  const incrementHandler = () =>{
   dispath(counterActions.increment());
  }
  const decrementHandler =() =>{
    dispath(counterActions.decrement());
  }

  const increaseHandler = () =>{
    dispath(counterActions.increase(5))
  }
  


  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
       <div>
         <button onClick={incrementHandler}>Increment</button>
         <button onClick={increaseHandler}>Increase by 5</button>
         <button onClick={decrementHandler}>Decrement</button>
       </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
