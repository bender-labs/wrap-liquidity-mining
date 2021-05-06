const baseOp = '/op/:token';
const STAKE = `${baseOp}/stake`;
const WITHDRAW = `${baseOp}/withdraw`;
const CLAIM = `${baseOp}/claim`;

export const opPaths = [STAKE, WITHDRAW, CLAIM];

export const paths = { STAKE, WITHDRAW, CLAIM };

export const opPage = (v: string)=> STAKE.replace(':token', v)
