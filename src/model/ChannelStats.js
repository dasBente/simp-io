export class ChannelStats {
    channels = {};
    types = [];

    addPayment({type, name, date, data}) {
        if (!(name in this.channels)) this.channels[name] = {name};
        if (!(type in this.channels[name])) this.channels[name][type] = {};

        const channelData = this.channels[name][type];

        if (!(date in channelData)) channelData[date] = [];
        const day = channelData[date];

        day.push(data);
    }
}
