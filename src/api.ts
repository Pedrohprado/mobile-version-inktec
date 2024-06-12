interface Place {
  url: string;
  options: {
    method: string;
  };
}

export function GET_WEEK_INFORMATIONS(from: string, to: string): Place {
  return {
    url: `http://10.20.2.79:3131/api/week/${from}/${to}`,
    options: {
      method: 'GET',
    },
  };
}

export function GET_CONDIT_ORV(): Place {
  return {
    url: 'http://10.20.2.79:3333/api/potlife',
    options: {
      method: 'GET',
    },
  };
}

export function GET_STATUS_CABIN(): Place {
  return {
    url: 'http://10.20.2.79:3131/api/getallstatus',
    options: {
      method: 'GET',
    },
  };
}

export const calculatePlace = (
  temperature: string,
  umity: string
): { Tpo: number; tempInk: number } => {
  const temp = +temperature;
  const umi = +umity;

  const Tpo = +(
    (umi / 100) ** 0.125 * (112 + 0.9 * temp) +
    0.1 * temp -
    112
  ).toFixed(2);

  const tempInk = +Tpo + 3;
  return { Tpo, tempInk };
};
