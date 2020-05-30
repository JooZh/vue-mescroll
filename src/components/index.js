import mescroll from './component.js'

function install(Vue,config) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('vue-mescroll', mescroll(config));
}

export default install;
