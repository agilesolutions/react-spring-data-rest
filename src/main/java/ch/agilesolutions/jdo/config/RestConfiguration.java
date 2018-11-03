package ch.agilesolutions.jdo.config;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RestConfiguration extends RepositoryRestConfigurerAdapter{

      @PersistenceContext
      private EntityManager entityManager;

      @Override
      public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
           //TODO: Expose for specific entity!
           //config.exposeIdsFor(Officer.class);
           //config.exposeIdsFor(Position.class);

           //TODO: Expose id for all entities!
           entityManager.getMetamodel().getEntities().forEach(entity->{
                try {
                     System.out.println("Model: " + entity.getName());
                     Class<? extends Object> clazz = Class.forName(String.format("ch.agilesolutions.jdo.domain.%s", entity.getName()));
                     config.exposeIdsFor(clazz);
                } catch (Exception e) {
                     System.out.println(e.getMessage());
                }
            });
    }
}