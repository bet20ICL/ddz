import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);
import {ask} from '@reach-sh/stdlib/ask.mjs';
import {startGame} from './script.mjs';

(async () => {
  const startingBalance = stdlib.parseCurrency(10);
  const accAlice = await stdlib.newTestAccount(startingBalance);
  const accBob = await stdlib.newTestAccount(startingBalance);

  const ctcAlice = accAlice.deploy(backend);
  const ctcBob = accBob.attach(backend, ctcAlice.getInfo());
  // console.log(`Hello World`);
  await Promise.all([
    backend.Alice(ctcAlice, {
      // implement Alice's interact object here
    }),
    backend.Bob(ctcBob, {
      // implement Bob's interact object here
    }),
  ]);
  console.log(`Hello World`);
  startGame();
})(); 