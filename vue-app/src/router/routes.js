const routes = [
    // {
    //     path: "/",
    //     name: 'Home',
    //     component: () => import('../views/Base.vue'),
    // },
    {
        path: "/phonevalidation",
        name: 'phoneValidation',
        component: () => import('../views/PhoneValidation.vue'),
    },
    {
        // path: "/register/:phone",
        path: "/register/",
        name: 'register',
        component: () => import('../views/Register.vue'),
        props: (route) => route.params
    },
    {
        path: "/checkaccount",
        name: 'checkAccount',
        component: () => import('../views/CheckAccount.vue'),
    },
    {
        path: "/forgetPassword",
        name: 'forgetPassword',
        component: () => import('../views/ForgetPassword.vue'),
    },
    {
        path: "/test",
        name: 'test',
        component: () => import('../views/Test.vue'),
    },
    // {
    //     path: '/:catchAll(.*)',
    //     name: '404',
    //     component: () => import('../views/404.vue')
    // }
]

export default routes