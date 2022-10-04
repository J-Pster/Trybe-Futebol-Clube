// CRÉDITOS AO FELIPE ROCHA POR FAZER OS MOCKS!
// https://github.com/tryber/sd-020-b-trybe-futebol-clube/pull/25/files#diff-31c92750593fefefef835fa1ee9837f5ef1e7a184932a7319a7be1ff7e7b744c

export const user = {
  validAdmin: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  },
  validUser: {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  },
}

export const login = {
  existAdmin: {
    email: 'admin@admin.com',
    password: 'secret_admin',
  },  
  existUser: {
    email: 'user@user.com',
    password: 'secret_user',
  },
  invalidEmail: {
    email: 'user@xablaucom',
    password: 'senha_invalida',
  },
  invalidPassword: {
    email: 'user@xablau.com',
    password: 's',
  },
  wrongEmail: {
    email: 'user@xablau.com',
    password: 'senha_invalida',
  },
  wrongPassword: {
    email: 'user@user.com',
    password: 'senha_invalida',
  },
}