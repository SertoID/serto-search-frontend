import { createAgent, IResolver } from "@veramo/core";
import { MessageHandler } from "@veramo/message-handler";
import { W3cMessageHandler } from "@veramo/credential-w3c";
import { JwtMessageHandler } from "@veramo/did-jwt";
import { DIDResolverPlugin, UniversalResolver } from '@veramo/did-resolver'
import { Resolver, DIDResolver } from "did-resolver";
import { EthrDIDProvider } from "@veramo/did-provider-ethr";
import { getResolver as getEthrResolver } from "ethr-did-resolver";

const infuraProjectId = "474dcf9e96a44844983cdb88648f43e7";

const uniresolver = new UniversalResolver({
  url: "https://uniresolver.io/1.0/identifiers/",
}) as DIDResolver;

const ethrDidProvider = new EthrDIDProvider({
  defaultKms: "local",
  network: "mainnet",
  rpcUrl: `https://mainnet.infura.io/v3/${infuraProjectId}`,
  gas: 1000001,
  ttl: 60 * 60 * 24 * 30 * 12 + 1,
});

const ethrRinkebyDidProvider = new EthrDIDProvider({
  defaultKms: "local",
  network: "rinkeby",
  rpcUrl: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
  gas: 1000001,
  ttl: 60 * 60 * 24 * 30 * 12 + 1,
});

export const agent = createAgent<MessageHandler & IResolver>({
  plugins: [
    new MessageHandler({
      messageHandlers: [new JwtMessageHandler(), new W3cMessageHandler()],
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        key: uniresolver,
        web: uniresolver,
        ...getEthrResolver(ethrRinkebyDidProvider),
        ...getEthrResolver(ethrDidProvider),
        ion: uniresolver,
        elem: uniresolver,
      }),
    }),
  ],
});