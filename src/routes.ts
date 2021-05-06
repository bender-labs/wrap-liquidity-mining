const baseOp = '/op/:token';
const STAKE = `${baseOp}/stake`;
const UNSTAKE = `${baseOp}/unstake`;
const CLAIM = `${baseOp}/claim`;

export const opPaths = [STAKE, UNSTAKE, CLAIM];

export const paths = { STAKE, UNSTAKE, CLAIM };

export const opPage = (v: string) => STAKE.replace(':token', v);
