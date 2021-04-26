import { createAgent, IResolver } from "@veramo/core";
import { MessageHandler } from "@veramo/message-handler";
import { W3cMessageHandler } from "@veramo/credential-w3c";
import { JwtMessageHandler } from "@veramo/did-jwt";
import { DIDResolverPlugin, UniversalResolver } from '@veramo/did-resolver'
import { Resolver, DIDResolver } from "did-resolver";
import { getResolver as ethrDidResolver } from "ethr-did-resolver";

const infuraProjectId = "474dcf9e96a44844983cdb88648f43e7";

const uniresolver = new UniversalResolver({
  url: "https://uniresolver.io/1.0/identifiers/",
}) as DIDResolver;

export const agent = createAgent<MessageHandler & IResolver>({
  plugins: [
    new MessageHandler({
      messageHandlers: [new JwtMessageHandler(), new W3cMessageHandler()],
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        key: uniresolver,
        web: uniresolver,
        ethr: ethrDidResolver({
          networks: [{ name: 'rinkeby', rpcUrl: 'https://rinkeby.infura.io/v3/' + infuraProjectId }],
        }).ethr,
        // ...getEthrResolver(ethrDidProvider),
        ion: uniresolver,
        elem: uniresolver,
      }),
    }),
  ],
});