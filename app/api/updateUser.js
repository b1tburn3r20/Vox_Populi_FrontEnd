
import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function updateUser(req, res) {
  try {
    const { user } = getSession(req, res);
    const accessToken = await getAccessToken(req, res, {
      scopes: ['update:users']
    });
    const { userId, userMetadata } = req.body;

    // Check if the logged-in user is the same as the one being updated
    if (user.sub !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const response = await fetch(`https://dev-xborzumfv06dhtbc.us.auth0.com/api/v2/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_metadata: userMetadata })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
});
