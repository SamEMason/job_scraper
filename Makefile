run:
	@pnpm exec tsx src/main

scrape:
	@pnpm exec tsx src/main scrape

discovery:
	@pnpm exec tsx src/main discovery

filters:
	@pnpm exec tsx src/main filters

clean:
	@rm -rf test-results store/