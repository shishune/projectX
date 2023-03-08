/*
A context for passing user specific information such as if they are sign in, if they
are the admin, the user object they correspond to as well as setters for all of them.
*/

import { createContext } from 'react';

const UserContext = createContext({});
export default UserContext;