package net.smart.common.configuration;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SmartAwsS3Config {

    @Bean
    public TransferManager transferManager() {
        return TransferManagerBuilder.standard().withS3Client(
                AmazonS3ClientBuilder.standard().withCredentials(
                        new DefaultAWSCredentialsProviderChain()
                ).withRegion(Regions.AP_NORTHEAST_2)
                .build()
        ).build();
    }
}
