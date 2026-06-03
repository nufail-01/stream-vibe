// import { Smartphone, Tablet, Tv, Laptop, Gamepad2, Glasses } from "lucide-react";

// const DEVICES = [
//   {
//     id: 1,
//     name: "Smartphones",
//     icon: Smartphone,
//     description:
//       "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
//   },
//   {
//     id: 2,
//     name: "Tablet",
//     icon: Tablet,
//     description:
//       "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
//   },
//   {
//     id: 3,
//     name: "Smart TV",
//     icon: Tv,
//     description:
//       "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
//   },
//   {
//     id: 4,
//     name: "Laptops",
//     icon: Laptop,
//     description:
//       "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
//   },
//   {
//     id: 5,
//     name: "Gaming Consoles",
//     icon: Gamepad2,
//     description:
//       "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
//   },
//   {
//     id: 6,
//     name: "VR Headsets",
//     icon: Glasses,
//     description:
//       "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
//   },
// ];

// // Single Device Card
// const DeviceCard = ({ device }) => {
//   const Icon = device.icon;

//   return (
//     <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 flex flex-col gap-8">

//       {/* Icon + Name */}
//       <div className="flex items-center gap-4">
//         <div className="w-14 h-14 bg-[#2a1a1a] border border-red-900/40 rounded-xl flex items-center justify-center shrink-0">
//           <Icon size={26} className="text-red-500" />
//         </div>
//         <span className="text-white font-semibold text-lg">{device.name}</span>
//       </div>

//       {/* Divider */}
//       <div className="w-full h-px bg-white/10" />

//       {/* Description */}
//       <p className="text-white/50 text-sm leading-relaxed">{device.description}</p>
//     </div>
//   );
// };

// // Main Section
// const DevicesSection = () => {
//   return (
//     <section className="bg-[#141414] px-6 md:px-12 py-24">

//       {/* Header */}
//       <div className="mb-12">
//         <h2 className="text-white text-3xl font-bold mb-3">
//           We Provide you streaming experience across various devices.
//         </h2>
//         <p className="text-white/50 text-sm max-w-3xl leading-relaxed">
//           With StreamVibe, you can enjoy your favorite movies and TV shows
//           anytime, anywhere. Our platform is designed to be compatible with a
//           wide range of devices, ensuring that you never miss a moment of
//           entertainment.
//         </p>
//       </div>

//       {/* 3x2 Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {DEVICES.map((device) => (
//           <DeviceCard key={device.id} device={device} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default DevicesSection;

// // Single Device Card
// const DeviceCard = ({ device }) => {
//   const Icon = device.icon;

//   return (
//     <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex flex-col gap-8">

//       {/* Icon + Name */}
//       <div className="flex items-center gap-4">
//         <Icon />
//         <span className="text-white font-semibold text-lg">{device.name}</span>
//       </div>

//       {/* Divider */}
//       {/* <div className="w-full h-px bg-white/10" /> */}

//       {/* Description */}
//       <p className="text-white/50 text-sm leading-relaxed">{device.description}</p>
//     </div>
//   );
// };

// // Main Section
// const DevicesSection = () => {
//   return (
//     <section className="bg-[#141414] px-6 md:px-12 pt-12 pb-20">

//       {/* Header */}
//       <div className="mb-12">
//         <h2 className="text-white text-3xl font-bold mb-3">
//           We Provide you streaming experience across various devices.
//         </h2>
//         <p className="text-white/50 text-sm max-w-3xl leading-relaxed">
//           With StreamVibe, you can enjoy your favorite movies and TV shows
//           anytime, anywhere. Our platform is designed to be compatible with a
//           wide range of devices, ensuring that you never miss a moment of
//           entertainment.
//         </p>
//       </div>

//       {/* 3x2 Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {DEVICES.map((device) => (
//           <DeviceCard key={device.id} device={device} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default DevicesSection;

import { DEVICES } from "../constants/devicesData";

const DeviceCard = ({ device }) => {
  const Icon = device.icon;

  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 hover:border-red-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-lg bg-[#141414] border border-white/10">
          <Icon className="w-6 sm:w-7 h-6 sm:h-7" />
        </div>

        <h3 className="text-white font-semibold text-base sm:text-lg">{device.name}</h3>
      </div>

      <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
        {device.description}
      </p>
    </div>
  );
};

const DevicesSection = () => {
  return (
    <section id="devices" className="bg-[#141414] px-4 sm:px-6 md:px-12 py-16 sm:py-18 md:py-20">
      <div className="mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          We Provide You Streaming Experience Across Various Devices
        </h2>

        <p className="text-white/60 max-w-4xl leading-relaxed mb-12 sm:mb-16 md:mb-20 text-xs sm:text-sm md:text-base">
          With StreamVibe, you can enjoy your favorite movies and TV shows
          anytime, anywhere. Our platform is designed to be compatible with a
          wide range of devices, ensuring that you never miss a moment of
          entertainment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {DEVICES.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </section>
  );
};

export default DevicesSection;
