import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { FaDatabase, FaTv, FaHands } from 'react-icons/fa';
import TextType from './TextType';

interface DeveloperInstructionsProps {
  cardOpacity?: number;
}

export default function DeveloperInstructions({ cardOpacity = 85 }: DeveloperInstructionsProps) {
  return (
    <div className='w-full mt-10'>
      {/* Header outside cards */}
      <div className='text-center'>
        <TextType
          text='Getting Started with Home-Pulse'
          typingSpeed={50}
          deletingSpeed={30}
          pauseDuration={5000}
          loop
          className='text-3xl font-bold text-white text-center'
        />
      </div>

      <main className='flex justify-between space-x-6 mt-10'>
        {/* Backend Setup Card */}
        <Card className={`bg-background${cardOpacity === 100 ? '' : `/${cardOpacity}`} backdrop-blur`}>
          <CardHeader>
            <CardTitle className='text-2xl flex items-center gap-2'>Backend Setup <FaDatabase /></CardTitle>
            <CardDescription>
              Configure MongoDB, IoT devices, and MQTT broker for the backend
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <ol className='list-decimal list-inside space-y-3 text-muted-foreground ml-4'>
              <li>
                <span className='text-black font-bold'>Set up a MongoDB instance</span>—local or cloud—and add its connection string to the backend
                <code>.env</code> so the server can store users, houses, rooms, and devices.
              </li>
              <li>
                <span className='text-black font-bold'>Prepare your IoT hardware</span> (ESP32, Raspberry Pi, etc.), program it to work with an MQTT broker,
                and publish sensor values to the topics the backend expects.
              </li>
              <li>
                <span className='text-black font-bold'>Install or host an MQTT broker</span> locally or on a Raspberry Pi, then place the broker URL, port, and
                credentials into the backend <code>.env</code> file so the server can subscribe to all necessary topics.
              </li>
              <li>
                <span className='text-black font-bold'>Start the backend</span> so it connects to MongoDB, listens to the configured MQTT topics, and exposes
                its API to the frontend.
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Frontend Setup Card */}
        <Card className={`bg-background${cardOpacity === 100 ? '' : `/${cardOpacity}`} backdrop-blur`}>
          <CardHeader>
            <CardTitle className='text-2xl flex items-center gap-2'>Frontend Setup <FaTv /></CardTitle>
            <CardDescription>
              Configure and start the frontend application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className='list-decimal list-inside space-y-3 text-muted-foreground ml-4'>
              <li><span className='text-black font-bold'>Add the backend’s URL</span> to the frontend configuration to enable API communication.</li>
              <li><span className='text-black font-bold'>Start the frontend normally</span> so it can interact with the backend and display real-time data.</li>
            </ol>
          </CardContent>
        </Card>

        {/* Using the App Card */}
        <Card className={`bg-background${cardOpacity === 100 ? '' : `/${cardOpacity}`} backdrop-blur`}>
          <CardHeader>
            <CardTitle className='text-2xl flex items-center gap-2'>Using the App for the First Time <FaHands /></CardTitle>
            <CardDescription>
              Steps to get started with your Home-Pulse system
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <ol className='list-decimal list-inside space-y-2 text-muted-foreground ml-4'>
              <li><span className='text-black font-bold'>Create a user account</span>.</li>
              <li><span className='text-black font-bold'>Log in to the app</span>.</li>
              <li><span className='text-black font-bold'>Create a house and add at least one room</span>.</li>
              <li><span className='text-black font-bold'>Register a device and assign it to a room</span>.</li>
              <li>
                The system will begin listening to that device’s MQTT topics, showing live sensor values in the 3D
                room model and numerical data on the dashboard.
              </li>
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

