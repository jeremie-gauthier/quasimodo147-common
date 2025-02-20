import { Channel, Connection } from 'amqplib';

export abstract class Publisher<T> {
	abstract queueName: string;

	protected channel!: Channel;

	constructor(protected connection: Connection) {}

	public async publish(data: T) {
		this.channel = await this.connection.createChannel();

		await this.channel.assertQueue(this.queueName, { durable: true });

		this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(data)));

		console.log('Published expiration event');
	}
}
