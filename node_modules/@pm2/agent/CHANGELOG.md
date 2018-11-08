# Changelog

## v0.5.17 (02/11/2018)
- [version: patch bump to 0.5.17](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/58da680a89b77640cd8383e5a69a3caa5e21247c) - @Eywek
- [improv: use ws by default for all connections](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/63a07ded8bb1f9d9a7d752b53d7eba8de92bb09a) - @vmarchaud

---

## v0.5.16 (19/09/2018)
- [version: patch bump to 0.5.16](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/5f5f8976f88a41cc012e2294a9d2a1b9a108bbf0) - @Eywek
- [fix: don't call the action callback for each process](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/1a36002badc9d3793012ec862f643978ffddd45c) - @Benoît Zugmeyer
- [fix: unify the 'reset' action parameters](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/8b2afdda43ec95b60cc02ceab79ce6b34ffb76f1) - @Benoît Zugmeyer

---

## v0.5.15 (28/08/2018)
- [version: patch bump to 0.5.15](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/074d28e3ce5a802e0db5ba76be43b651e465673b) - @Eywek
- [improv: fix pm2 unmonitor #105](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/620b3ee01f4b782268d10bc0fc06f229caebd71d) - @Eywek

---

## v0.5.14 (23/08/2018)
- [version: patch bump to 0.5.14](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/ad05458ea75ae318cafe4b0d87f5307e038f8ced) - @Eywek
- [improv: fix tests](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/2c15f70e44ae571393b0c783e771962b20de3beb) - @Eywek
- [improv: standard and remove useless try catch](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/e2a58060d5bf68ffe47e36f6c867a14d80d656ce) - @Eywek
- [fix: when wrong secret/public (statusCode>200) return proper msg to cli](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/6359e8a1a16cdb5c2c8692b776b06747bfe8f5a5) - @Unitech
- [improv: avoid duplication and process.send exception](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/8ee11c541526dd4460209dead68d07680e93f4d3) - @Unitech
- [remove handy-http](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/05660c34c6c7acbbe2974671c73e1c93b08db620) - @Unitech
- [improv: fix a crash if pm2 is not ready](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/5e3e1d030bf78c84ffdc3e6068d1489c88324d8a) - @Eywek
- [improv: add some logs to try to fix #85](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/56ab97f7e59ddd5c39878134d58a3e6ac35ca4cc) - @Eywek

---

## v0.5.13 (03/08/2018)
- [version: patch bump to 0.5.13](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/4580c2e70f34460497fb4cdf628a3afb7e77bd8f) - @vmarchaud
- [improv: allow to disable context retrivable on error](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/03685591fb538c90c75700da793a3fefeb2ae0d6) - @vmarchaud

---

## v0.5.12 (01/08/2018)
- [version: patch to 0.5.12](https://github.com/keymetrics/pm2-io-agent/commit/d2a8d0fd9cc6f57fc2d09d54fd32758e9c39f93a) - @Unitech
- [meta: standard](https://github.com/keymetrics/pm2-io-agent/commit/101f22755a835d57486e0aec46b7a314e4bf263d) - @vmarchaud
- [#91 #92 call agent exit once new agent is spawned + protect some calls](https://github.com/keymetrics/pm2-io-agent/commit/e8db920cfdca2521d8ca95fe71ade64113bec129) - @Unitech
- [#91](https://github.com/keymetrics/pm2-io-agent/commit/a778a8cf3c59a1db4e83ccff7b5fbdff19810ea5) - @Unitech
- [chore: 0.5.11 CHANGELOG](https://github.com/keymetrics/pm2-io-agent/commit/5c3ef8c8c7185af9d6c8ef96726d70b55cea1c22) - @Unitech

---

## v0.5.11 (24/07/2018)
- [version: patch bump to 0.5.11](https://github.com/keymetrics/pm2-io-agent/commit/3ea7b4ed8c76e6c029e1762f9928b28a7887ca01) - @Unitech
- [feature: add version to process name](https://github.com/keymetrics/pm2-io-agent/commit/5a43ff192f89ad3b25fcf77c0d31960ff4492e7b) - @Unitech
- [chore: remove some logs](https://github.com/keymetrics/pm2-io-agent/commit/c946600bb2c5f906f99cc1441d9f4fe4c9d7a5f3) - @Unitech
- [change](https://github.com/keymetrics/pm2-io-agent/commit/46529b348a981aae4aa2c08031e167cbbe3410d3) - @Unitech
- [disable watchdog on exit - make call to cb 'synchronous' #88](https://github.com/keymetrics/pm2-io-agent/commit/1593707c89e655f38cd0497b772f3d97798e0762) - @Unitech
- [chore: update changelog](https://github.com/keymetrics/pm2-io-agent/commit/2de1e38085a5c83b0ff845e28ee148f66b7833d6) - @Eywek

---

## v0.5.10 (19/07/2018)
- [feat: add agent version into status packet](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/306b79f6cdb2b502e65c14f5ab55b366b0fa7309) - @Eywek
- [feat: handle heapprofile](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/e783ae3d21eb658fda88be8fe94636ec09f0e61d) - @Eywek

---

## v0.5.9 (16/07/2018)
- [version: patch bump to 0.5.9](https://github.com/keymetrics/pm2-io-agent/commit/8fc8f07c572efea8d0dd1a382e2b34d7939c0a87) - @Unitech
- [fix: scope](https://github.com/keymetrics/pm2-io-agent/commit/5c0b1e8d90c4d5d3f380282e48a77d39490ba140) - @Unitech

---

## v0.5.8 (16/07/2018)
- [version: patch bump to 0.5.8](https://github.com/keymetrics/pm2-io-agent/commit/cccfe46821e5ba4ef764a557469113f41ab13d2e) - @Unitech
- [fix: check if object](https://github.com/keymetrics/pm2-io-agent/commit/e87d14fb18bdbc5a9be636f6a0daf9ebfb7b0bf5) - @Unitech
- [fix: abort connection if error has been received from root](https://github.com/keymetrics/pm2-io-agent/commit/dd9d83ddb1f790f2f2079ba0fa45ac94c015bf99) - @Unitech
- [chore: add machine name on info](https://github.com/keymetrics/pm2-io-agent/commit/1577b80c3444a7ff376e4ed49ec24cbfc284551e) - @Unitech
- [quick fix: #68 reduce time to reconnect](https://github.com/keymetrics/pm2-io-agent/commit/fd917f725348f2a5ec4af8800a23752afe770630) - @Unitech
- [improv: delay start of watchdog (once everything is fine start it ok)](https://github.com/keymetrics/pm2-io-agent/commit/616f366ccc498e3f27e6ddb5684a08589bf8049c) - @Unitech
- [remove old keymetrics links](https://github.com/keymetrics/pm2-io-agent/commit/5f37cc825672d12e562848343422ebc43f144cce) - @Unitech
- [adapt test](https://github.com/keymetrics/pm2-io-agent/commit/a3d2e88420c0f6ff9b48607e9701fc32020b6c7d) - @Unitech
- [fix #82](https://github.com/keymetrics/pm2-io-agent/commit/b01f244c28ff580bfa8ad136a6a706527b12b316) - @Unitech
- [chore: edit changelog](https://github.com/keymetrics/pm2-io-agent/commit/671dd19b166f50f0e66ac8c66ee085d33b180ee4) - @Eywek

---

## v0.5.7 (05/07/2018)
- [version: patch bump to 0.5.7](https://github.com/keymetrics/pm2-io-agent/commit/6ad4835e6e5f5f76d43ee4466291e16732b4fb24) - @Eywek
- [improv: send secret key via root ping / websocket headers](https://github.com/keymetrics/pm2-io-agent/commit/d4fca650b051af99cbbd99d30bf6dc546ce6f1b2) - @Eywek

---

## v0.5.6 (04/07/2018)
- [version: patch bump to 0.5.6](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/92f2d1cef8303b83b0a0a054e664b2eeb88e9702) - @vmarchaud
- [reverse: fix resolve id instead of name](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/e4f5861b843acff0e3b37ef0294f2fdbabd88f60) - @vmarchaud

---

## v0.5.5 (27/06/2018)
- [version: patch bump to 0.5.5](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/4730fd7d609f43cf3bdf0214605c2ca0fb137772) - @Eywek
- [improv: fix old configuration retrieve](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/d28aceba21568c3a5641977af3752030d5e1d59a) - @Eywek
- [chore: add changelog.md #80](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/b19b510036a2d06c5abb41f37308ca39c0ee0ba9) - @Eywek
- [improv: fix node version with iojs](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/b87e6e6539c56bd0cec9926f18c3c5cf483d9ff5) - @Eywek

---

## v0.5.3 (25/06/2018)
- [version: patch bump to 0.5.3](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/9cc4354e83a9be29a46580d418dd40709d844815) - @Eywek
- [improv: add signal handlers to enable profiling #75](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/711424b356f0cda85531ebd4bc62720f4c6f50af) - @vmarchaud
- [improv: cleanup useless vars and fix output functions](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/c3ef347847f350166073f45adf27723b9bfc9211) - @Eywek
- [improv: fix active transporters #74](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/0acf4142521676fc30d63888a3f07cd91e7a4dc9) - @Eywek
- [improv: move websocket error listener #78](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/bb977bd6e6f1a2ccfb329b250ac56e21974d707c) - @Eywek
- [improv: fix debug prefix](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/b619bf1c612cc5469cd159562317198342f14556) - @Unitech
---

## v0.5.2 (25/06/2018)
- [version: patch bump to 0.5.2](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/24b70b2f6ba61232305bfb854e73e3d0f587b49e) - @Eywek
- [improv: fix ws connect() method for reconnects](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/63e541dd1d6b755056e332b37966ad7b5c646069) - @Eywek
- [improv: delay the logging timeout when calling starting it multiple times](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/df2940780b30b1d46549d0e567d632c5aa71922e) - @BenoitZugmeyer
- [improv: fix crash #72](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/0ad1598dbec6489090e6ec23f25cbf3826d89c6a) - @Eywek
- [feat: add pm2 reverse actions available #69](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/da042bfa41ab75391590d27f3ffbcfedbe948d84) - @Eywek
- [improv: use process_id instead of process_name for broadcast logs #70](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/b16dab1dc8f08f4be85f240c534f4a0978f1fb6c) - @Eywek

---

## v0.5.4 (25/06/2018)
- [version: patch bump to 0.5.4](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/fe2ab1b41bb9253f077c683339b33fec67cca385) - @Eywek
- [improv: fix leak](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/fa9ecd9ebfa07da69f72920901bf77b33ee19dda) - @Eywek

---

## v0.4.2 (04/06/2018)
- [version: patch bump to 0.4.2](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/551756d069a0c84e64cd5f7f5fbd635e6eb2abaa) - @vmarchaud
- [transaction: export startTime for each span #50](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/521cbc3cbc4d8931cade0319dffdfd2be8a2aa8b) - @vmarchaud
- [ci: add node 10](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/171edf61683282b350b7cc4525604093bf89f4ff) - @vmarchaud

---

## v0.5.1 (04/06/2018)
- [version: patch bump to 0.5.1](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/1b0e099a50547c1a4ba5dcadeac1708653c106bf) - @vmarchaud
- [improv: background reconnect #66](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/f493817fec55fd06afb276ce63333294842164de) - @Eywek

---

## v0.5.0 (31/05/2018)
- [version: minor bump to 0.5.0](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/bc5547c0975171b2d93ad8038b41c07a97e90271) - @vmarchaud
- [improv: buffer data when not connected](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/11dc96b6ef945347ee28bdb314cacca939f4988d) - @Eywek
- [improv: add km_monitored handle](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/8b2a8c2a4b4d8d7dfa82222453c5f9645bcec0fd) - @Eywek
- [improv: use pub instead of pub-emitter for axon, stop handling manual reconnection](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/a5b85d97d81856dd7853189e4401feec7026e0e5) - @Eywek
- [improv: remove queue handle on axon](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/f25c07a7e178d10d2666d7b181105fd47b7694b6) - @Eywek
- [improv: edit json5 handle](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/6a08dafa224ac6177eba46a7355f9bb2f737a10e) - @Eywek
- [improv: use old logic for axon](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/733d4829cee5815a0ad04191710c691f9c7e3af2) - @Eywek
- [improv: fix reconnection with axon #58](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/5f3dfd8b67b0b35d61a1e2e4dbe174cd36fb9805) - @Eywek
- [improv: fix #43 watchdog](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/52ec50515a2fec77d0621b50dc471ecba5242c89) - @Eywek
- [improv: fix #58 agent queue](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/f9770963a48f426fdc224fb9bbf23379f2eec4cc) - @Eywek
- [improv: fix #48 for old agent](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/215a1188d186637aed0c86be7b977e86a89960e5) - @Eywek
- [improv: update 2 to 4 logs on exception #60](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/d520a28d0f29965796ecd7fcdc21007c6a0ff492) - @Eywek
- [improv: use logs instead of console.log](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/3ce5c3ba4a1382eb4b5a4f9a789acd90ae2a0fe5) - @Alexandre Strzelewicz
- [feat: keep ws conf](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/964b834f1788491b75a536a2f8a275d1c1b9a3c8) - @Alexandre Strzelewicz
- [chore: add coverage, use codeclimate](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/059ed419c93b13067c2bb4619d4a2b58516b1439) - @Eywek
- [fix: fix #49, logs buffer](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/ebb54be3ff34ab0357a637316781156ca43aa9d4) - @Eywek
- [axon: handle reconnection ourselves #52](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/c7dc5b33d3cce879fa0886a22d27019d8e2eb052) - @vmarchaud
---

## v0.4.1 (15/05/2018)
- [meta: add agpl3 license](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/d0449fe6a729b8ef9741c0e4c4c14bf24bd7e978) - @vmarchaud
- [meta: rename npm name #47](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/e710ad34eb41444965aff225cbdf021ce2494ff5) - @vmarchaud
- [version: patch bump to 0.4.1](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/2f1f07c6b3d525641534095ca720de2784aa071c) - @vmarchaud
- [daemon: catch error and restart itself #42](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/a722234e62d79d36ec3b6de21854f1e913ee4970) - @Unitech
- [fix: verify connectivity on axon socket #41](https://api.github.com/repos/keymetrics/pm2-io-agent/git/commits/b632712ea8f4cd08aa847611ffc23ff1f43b06a3) - @Unitech

---

## v0.4.0 (30/04/2018)
- [feat: use pm2_env for broadcast logs](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/9978cea528b775f0811c39e3af52be8348dc3c55) - @Eywek
- [improv: fix getActiveTransporters() method](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/f3811a662afcd9f1bc8277834b26596a523e86a6) - @Eywek
- [improv: isConnected() using axon buffer and nssocket waiting retry, fix #35](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/d2e7d08c73bd5192e0dfd643eec78c30248b699d) - @Eywek

---

## v0.3.5 (30/04/2018)
- [version: patch bump to 0.3.5](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/3c70564a3258f8d7f1319963a131814732f8c254) - @vmarchaud
- [ci: remove node 10 (still not available)](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/45e34487b24fdc1ff72ea9c821cd1cff97e8706c) - @vmarchaud
- [chore: bugfix getInfos RPC request #34](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/fe3754bf8f859a690caf47377ae6d6f374a03db9) - @vmarchaud
- [improv: read profiling file as raw](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/28e82813bd8b8033c0bd4f8e5c042442219f3ab6) - @Eywek
- [improv: edit default websocket endpoint](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/e64f49f5dc0978215dabbc9836251a2bf28d0447) - @Eywek
- [fix: set DAEMON_ACTIVE to true when successfully connected](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/ddf44f3358c41480d9cf63f66e14fa1ad7525982) - @Unitech
- [chore: up pm2-axon-rpc](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/c5ad2a2aee45b54a4aa608d838f0eb5eec121983) - @Unitech
- [ci: add node 10](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/f21612599911ef6416e054597e62d797ff63ce76) - @Unitech
- [improv: fixs units tests](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/5a5dbaf71e3fa49ef0287e300f1e15af037b556c) - @Eywek

---

## v0.3.4 (25/04/2018)
- [version: patch bump to 0.3.4](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/c75c4c4e665acd6a1a4f373f3ca334d9269ddbaf) - @Eywek
- [improv: add internal_ip](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/ebb8e1a66cf1cdcec31be00dd870e910f45c992a) - @Eywek
- [improv: use ping() and pong() method for heartbeat #29](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/3e186fbd6ac6ad78b4ff584f8e609b44d44e4144) - @Eywek
- [axon: let nssocket & axon handle their reconnection](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/44945600f1e613ceb49477c936c5f9809e696818) - @vmarchaud

---

## v0.3.3 (23/04/2018)
- [improv: fixs some crashs / add heartbeat & some fixs/debugs #26 #27 #29](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/8866f1ee6d4b834a8c86875225ac307940ee136e) - @Eywek
- [profiling: send cpu/memory profile on one channel](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/76d7e7337bafb84c3db0414cf57413fa4ec4ee10) - @vmarchaud
- [chore: broadcast unique process_id + add unique_id for server](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/7e8dc512bce304fdb126d594d822c180691993ec) - @vmarchaud

---

## v0.3.2 (28/03/2018)
- [version: patch bump to 0.3.2](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/aa4e7ad5f214faddd4e00a3cbc28f2bc73764ede) - @vmarchaud
- [interactor: handle errors from handshake + enable log by default](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/36bfac7162c1f6a0b13be45f56acb6481972dbd4) - @vmarchaud
- [meta: document releasing of new version](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/36a130847ec3a6cbbcd1bfe2aeeff1e6d416e861) - @vmarchaud

---

## v0.3.1 (27/03/2018)
- [version: minor bump to 0.3.1](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/9dd93ff6c918e8de1939195c55f43b7cf2421b9f) - @vmarchaud
- [ci: add node 9 in test](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/0c4e9a154fc5644afd3d0e8117c322b37fce6462) - @vmarchaud
- [fix: skip a test on node 7](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/8660ec5a512f9591fc892df5360e3307552f1b0e) - @vmarchaud
- [tests: ignore some tests in node 4](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/f4b0b96793a1a1336f98305cf911319bdf4cd2ed) - @vmarchaud
- [fix: use url.parse for node 4](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/f591f439580a293fd3779e9ce95641502beae243) - @vmarchaud
- [fix: remove destructing object since not available in node 4](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/e95695aec1d4105b6806a834111eed628c8ac80a) - @vmarchaud
- [fix: remove destructing array since not available in node 4](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/8182ddab9e74572aa543704b5f0026d7ae95d91a) - @vmarchaud
- [fix: remove default args since not available in node 4](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/a754aeeac463dd69eb3b3ef063409bf695c106f3) - @vmarchaud
- [ci: remove coverage cause instability](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/4a588be281ad24bad13d61fd6e7619bd1d7bd96f) - @vmarchaud
- [meta: add use strict everywhere for node 4 + remove copyrights in files](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/b91b3dff271a2224b658ec0d614300985f3802a2) - @vmarchaud
- [ci: add matrix build for node version + npm publish](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/6be996dd05c4610afc85b5053f5b4486560cae06) - @vmarchaud
- [transporters: fix env variables for config](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/259ef096fd9f80ccc8cf50a10126b374a0b152a0) - @vmarchaud
- [chore: add readme](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/ac504b51a05a822233fc6c14ffb40c20f3384bd1) - @Eywek
- [review: edit pm2 interface dump](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/6257bf1b897c5b3c07abbd2d291509872fa11aee) - @Eywek
- [chore: merge master](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/8ee95daf2635c57e92480256cf1a52e4905a46d6) - @Eywek
- [chore: add watchdog](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/6b2514d998ea77bc9fb954827f4b58dc80252872) - @Eywek
- [improv: add tests on pm2 interface](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/f3836ef343e488271abf65d59449493ec5649f20) - @Eywek
- [improv: add tests on transporter interface](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/98c32c51ed36fe8dc695aa551e677ae38f6abcf4) - @Eywek
- [improv: add tests on pm2 interface](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/4f10759706a53f4b503c409123a77c3e32d847cf) - @Eywek
- [improv: add tests on transporter interface](https://api.github.com/repos/keymetrics/keymetrics-agent/git/commits/8c07a09acacb68aedd15e91a26c2a52f547e750b) - @Eywek
