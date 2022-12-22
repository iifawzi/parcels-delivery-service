interface IConfigs {
    API_LINK: string,
}
const configs: IConfigs = {
    API_LINK: process.env.REACT_APP_API_LINK!,
}

export default configs