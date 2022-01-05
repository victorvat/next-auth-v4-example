import { getSession } from 'next-auth/react';

const secret = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.status(200).send({
      content: 'Welcome to secret page.',
    });
  } else {
    res.status(401).send({
      error: 'You need to be signed in.',
    });
  }
};
export default secret;
