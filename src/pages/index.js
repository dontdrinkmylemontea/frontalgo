import React from 'react';
import Redirect from 'umi/redirect';
import menuData from '@/layouts/MenuData';

const defautHomeMenu = menuData[0].path;

export default () => <Redirect to={defautHomeMenu} />;
