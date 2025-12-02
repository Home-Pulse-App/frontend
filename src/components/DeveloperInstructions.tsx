import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ScrollReveal from './ScrollReveal';

export function DeveloperInstructions() {
  return (
    <div className='w-full max-w-4xl mx-auto space-y-6 px-4 pb-12'>
      <Card className='bg-background/95 backdrop-blur'>
        <CardHeader>
          <CardTitle className='text-2xl'>Getting Started with Home-Pulse</CardTitle>
          <CardDescription>
            <ScrollReveal>
              Follow these instructions to set up and run the Home-Pulse IoT monitoring system
            </ScrollReveal>
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-8'>
          {/* Backend Setup */}
          <section className='space-y-4'>
            <h3 className='text-xl font-semibold'>Backend Setup</h3>

            <div className='space-y-3'>
              <h4 className='text-lg font-medium'>1. Install and Configure MongoDB</h4>
              <p className='text-muted-foreground'>
                Home-Pulse uses MongoDB (accessed through Mongoose) to store users, houses, rooms and devices.
                Make sure a MongoDB instance is running, either locally or in the cloud, and place the connection
                string inside the backend .env file.
              </p>
            </div>

            <div className='space-y-3'>
              <h4 className='text-lg font-medium'>2. Prepare Your IoT Device</h4>
              <p className='text-muted-foreground'>
                Use an IoT board such as an ESP32 or a Raspberry Pi. Program the device to work with an MQTT
                broker and publish sensor values to the topics expected by the backend.
              </p>
            </div>

            <div className='space-y-3'>
              <h4 className='text-lg font-medium'>3. Set Up Your MQTT Broker</h4>
              <p className='text-muted-foreground'>
                You can host the broker on your local PC or directly on a Raspberry Pi. Add the broker URL,
                port and credentials to the backend .env file so that the server can subscribe to all required topics.
              </p>
            </div>

            <div className='space-y-3'>
              <h4 className='text-lg font-medium'>4. Launch the Backend</h4>
              <p className='text-muted-foreground'>
                Start the backend using the updated configuration. The server should automatically connect to
                MongoDB, subscribe to the MQTT topics and expose its API to the frontend.
              </p>
            </div>
          </section>

          {/* Frontend Setup */}
          <section className='space-y-4'>
            <h3 className='text-xl font-semibold'>Frontend Setup</h3>
            <p className='text-muted-foreground'>
              Add the backend URL to the frontend configuration so the webapp can communicate with the API.
              Start the frontend normally.
            </p>
          </section>

          {/* Using the App */}
          <section className='space-y-4'>
            <h3 className='text-xl font-semibold'>Using the App for the First Time</h3>
            <p className='text-muted-foreground'>
              Once both backend and frontend are running:
            </p>
            <ol className='list-decimal list-inside space-y-2 text-muted-foreground ml-4'>
              <li>Create a user account</li>
              <li>Log in</li>
              <li>Create a house</li>
              <li>Create a room inside that house</li>
              <li>Register a device</li>
              <li>Assign the device to a room</li>
            </ol>
            <p className='text-muted-foreground mt-4'>
              The app will begin listening to the MQTT topics associated with that device. Live sensor values
              will appear inside the 3D model of your room in real time, and the dashboard will display the
              numeric data.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
