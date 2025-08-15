// Contract Information Component
import { useRouter, usePathname } from "next/navigation";

export const ContractInformation: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold text-white mb-6">
        Smart Contract Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Contract Level</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-teal-400 font-bold text-lg">X1</span>
            <span className="text-gray-400">/</span>
            <span className="text-emerald-400 font-bold text-lg">X2</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Network</p>
          <p className="text-yellow-400 font-bold text-lg">Smart Chain</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Contract Address</p>
          <p
            onClick={() =>
              router.push(
                "https://bscscan.com/address/0xa0F4B186B5363e91A2ef9e58bF930b845Ad00BDe"
              )
            }
            className="text-yellow-400 font-bold text-lg font-mono"
          >
            0xa0F4B186...845Ad00BDe
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Contract Level</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-teal-400 font-bold text-lg">X3</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Network</p>
          <p className="text-yellow-400 font-bold text-lg">Smart Chain</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Contract Address</p>
          <p
            onClick={() =>
              router.push(
                "https://bscscan.com/address/0x017d61DE5Cd3F2AFB90066F760C26C3136b95Cf2"
              )
            }
            className="text-yellow-400 font-bold text-lg font-mono"
          >
            0x017d61DE5...3136b95Cf2
          </p>
        </div>
      </div>
    </div>
  );
};
