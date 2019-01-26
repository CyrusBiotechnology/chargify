import test from 'ava';
import {getCustomers} from './get-customers';

test('getCustomers should return list of customers', async (t) => {
  await new Promise(res => setTimeout(res, 2000));
  t.pass();
})
